---
title: "Building a Rate-Limited AI QA Chat App with Next.js and OpenAI"
publishedAt: 2025-11-20
description: ""
slug: "Building a Rate-Limited AI QA Chat App with Next.js and OpenAI"
isPublish: true
---

## Building a Rate-Limited AI QA Chat App with Next.js and OpenAI

In the rapidly evolving world of AI-powered applications, it's crucial to create systems that are not only powerful but also responsible and efficient. In this blog post, we'll walk through the process of building an AI QA chat application using Next.js and OpenAI in <200 lines of code, with a particular focus on implementing and testing rate limiting to ensure fair usage and protect our resources.

### Project Overview

Our project is a simple yet powerful AI chat application that allows users to interact with an AI assistant. The key features of this project include:

- A user-friendly chat interface built with **Next.js** and **React**

- Integration with **OpenAI GPT-3.5 model** for generating responses

- Rate limiting using **Upstash** to prevent abuse and manage costs

- A testing mechanism to verify the rate limiting functionality

- Creating a **company specific chat bot** with **custom prompt**

**Here is the architectural diagram of the application**

![architecture diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1731153011638/28758190-ddd7-470b-9381-e2be9fb0a7e3.png)

### Setting Up the Upstash Redis database

First create a redis database in Upstash by following these steps:

- Create a free account in Upstash

- You can create one free redis database in their free tier, so click on create database button

![upstash dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1731150926510/96be1dfb-9d1c-48cc-846c-29cdacf6d06e.png)

- Now, a form popup will appears and fill the name and region in the form

![database creation form](https://cdn.hashnode.com/res/hashnode/image/upload/v1731150972225/fa1d7dff-f5d9-4b38-9526-05a4f8f138e4.png)

- Now click next and select free tier in the `Select a Plan` section and click create the database.

- Now in the database page, scroll down to Rest api section, here you will find `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, which you will use in your next js application.

### Setting Up the Project

We start by creating a new Next.js project and installing the necessary dependencies:

```bash
npx create-next-app@latest ai-chat-app
cd ai-chat-app
npm install openai @upstash/ratelimit @upstash/redis
```

We also set up our environment variables in a `.env.local` file:

```bash
 OPENAI_API_KEY=your_openai_api_key_here 
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here 
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

For OpenAI key, go your **OpenAI developer account** and create an api key.

### Building the Chat Interface

Our chat interface is a React component that manages the state of the conversation and handles user input. Here's a simplified version of our component:

```typescript
// app/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ChatComponent() {
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    setIsLoading(true)
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
          <CardDescription>Chat with an AI assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((m, index) => (
              <div key={index} className={`p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <span className="font-bold">{m.role === 'user' ? 'You: ' : 'AI: '}</span>
                {m.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say something..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
```

### Implementing the API Route with Rate Limiting

The core of our application is the API route that handles chat requests. This is where we integrate OpenAI and implement rate limiting:

```typescript
// app/api/chat/route.ts
import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import OpenAI from "openai";

const openai = new OpenAI();

// Create a new ratelimiter, that allows 5 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
})

export async function POST(req: Request) {
  // Rate limiter check
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  try {
    const { messages } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages.map((message: { content: string, role: string }) => ({
        content: message.content,
        role: message.role,
      })),
    })

    const message = completion.choices[0].message?.content

    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
```

This implementation allows 5 requests per 30 seconds for each unique IP address.

### Testing the Rate Limiter

To verify that our rate limiter is working correctly, we added a "Test Rate Limit" button to our chat interface and a useState hook and this testRateLimit function. This button sends 10 rapid requests to our API and displays the results:

First add this `useState` hook in the `page.tsx`

```typescript
// app/page.tsx
const [rateLimitTest, setRateLimitTest] = useState<string[]>([])
```

Now add this testRateLimit function before the return statement :

```ts
// app/page.tsx
const testRateLimit = async () => {
  const results = []
  for (let i = 0; i < 10; i++) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Test' }] }),
    })
    results.push(`Request ${i + 1}: ${response.ok ? 'OK' : 'Rate limited'}`)
  }
  setRateLimitTest(results)
}
```

Now add this button in the bottom of `CardContent` section

```ts
// app/page.tsx
<div className="mt-4">
    <Button onClick={testRateLimit}>Test Rate Limit</Button>
       {rateLimitTest.map((result, index) => (
        <div key={index} className="text-sm mt-1">{result}</div>
    ))}
  </div>
  ```

 Now after adding this all in your `page.tsx`, your whole code will look like this 

```ts
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function ChatComponent() {
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rateLimitTest, setRateLimitTest] = useState<string[]>([]) // for rate limiting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    setIsLoading(true)
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

    // rate limiting function
  const testRateLimit = async () => {
    setRateLimitTest([])
    for (let i = 0; i < 10; i++) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [{ role: 'user', content: 'Test message' }] }),
        })

        if (response.ok) {
          setRateLimitTest(prev => [...prev, `Request ${i + 1}: OK`])
        } else {
          setRateLimitTest(prev => [...prev, `Request ${i + 1}: Rate limited`])
        }
      } catch {
        setRateLimitTest(prev => [...prev, `Request ${i + 1}: Error`])
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
          <CardDescription>Chat with an AI assistant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((m, index) => (
              <div key={index} className={`p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <span className="font-bold">{m.role === 'user' ? 'You: ' : 'AI: '}</span>
                {m.content}
              </div>
            ))}
          </div>
          {/* rate imit button */}
          <div className="mt-4">
            <Button onClick={testRateLimit}>Test Rate Limit</Button>
            {rateLimitTest.map((result, index) => (
              <div key={index} className="text-sm mt-1">{result}</div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Say something..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
```

**When we run this test, we expect to see the first 5 requests succeed and the next 5 fail due to rate limiting.**

### Running the application

Run this command in your terminal

```bash
npm run dev
```

Open `localhost:3000`, the UI will look like this

![app UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1731152539717/18df00ac-13b5-4e0e-9131-fbf61ef091ab.png)

### Company Specific Chat Bot

Now, lets convert this chat bot to more specific domain like a Company QA Bot. Here we will create a `company-data.ts` file to add details related to a fictional company and update our prompt.

Create `lib/company-data.ts` in the root directory and add this prompt content .

```ts
// lib/company-data.ts
export const companyData = {
    name: "TechCorp Solutions",
    description: "A leading provider of innovative software solutions",
    products: [
      "Cloud Management Platform",
      "AI-powered Analytics Suite",
      "Cybersecurity Toolkit"
    ],
    services: [
      "Custom Software Development",
      "IT Consulting",
      "24/7 Technical Support"
    ],
    policies: {
      support: "24/7 customer support via phone, email, and live chat",
      refund: "30-day money-back guarantee on all software licenses",
      privacy: "We adhere to strict data protection and privacy standards"
    },
    faq: [
      {
        question: "How can I request a demo?",
        answer: "You can request a demo by filling out the form on our website or contacting our sales team directly."
      },
      {
        question: "What industries do you serve?",
        answer: "We serve a wide range of industries including finance, healthcare, retail, and manufacturing."
      },
      {
        question: "Do you offer training for your software?",
        answer: "Yes, we offer comprehensive training programs for all our software solutions, both online and on-site."
      }
    ],
    contactInfo: {
      email: "info@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA 94105"
    }
  }
  ```

You can customize the content based on your needs.

### Updating the api routes

Lets add prompt and embed it in OpenAI api call.

Its the prompt I am using

```ts
// app/api/chat/route.ts
const generateSystemPrompt = (data: typeof companyData) => `
You are an AI assistant for ${data.name}. ${data.description}
Your role is to answer customer questions about our products, services, policies, and general inquiries.
Here are some key details about our company:

1. Products: ${data.products.join(', ')}
2. Services: ${data.services.join(', ')}
3. Support policy: ${data.policies.support}
4. Refund policy: ${data.policies.refund}
5. Privacy policy: ${data.policies.privacy}

Please provide helpful, concise answers to customer questions based on this information.
If you don't know the answer to a specific question, politely say so and offer to connect the customer with a human representative using our contact information:
Email: ${data.contactInfo.email}
Phone: ${data.contactInfo.phone}
`
```

Now lets attach the prompt to the model, so it can take reference from the data

```ts
// app/api/chat/route.ts
import { companyData } from '@/lib/company-data';

const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: generateSystemPrompt(companyData) },
        ...messages.map((message: { content: string, role: string }) => ({
          content: message.content,
          role: message.role,
        })),
      ],
    })
```

Your whole backend code will look like this now:

```ts
// app/api/chat/route.ts
import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import OpenAI from "openai";
import { companyData } from '@/lib/company-data';

const openai = new OpenAI();

// Create a new ratelimiter, that allows 5 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
})

const generateSystemPrompt = (data: typeof companyData) => `
You are an AI assistant for ${data.name}. ${data.description}
Your role is to answer customer questions about our products, services, policies, and general inquiries.
Here are some key details about our company:

1. Products: ${data.products.join(', ')}
2. Services: ${data.services.join(', ')}
3. Support policy: ${data.policies.support}
4. Refund policy: ${data.policies.refund}
5. Privacy policy: ${data.policies.privacy}

Please provide helpful, concise answers to customer questions based on this information.
If you don't know the answer to a specific question, politely say so and offer to connect the customer with a human representative using our contact information:
Email: ${data.contactInfo.email}
Phone: ${data.contactInfo.phone}
`

export async function POST(req: Request) {
  // Rate limiter check
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json({ error: 'Too Many Requests' }, { status: 429 })
  }

  try {
    const { messages } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: generateSystemPrompt(companyData) },
        ...messages.map((message: { content: string, role: string }) => ({
          content: message.content,
          role: message.role,
        })),
      ],
    })

    const message = completion.choices[0].message?.content

    return NextResponse.json({ message })
  } catch {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
```

### Updating the Frontend

I have removed the Test Rate Limit button and added some custom messages to the code. The final frontend code in `page.tsx` will look like this

```ts
// app/page.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { companyData } from '@/lib/company-data'

export default function CompanyQABot() {
  const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([
    { role: 'assistant', content: `Hello! I'm the AI assistant for ${companyData.name}. How can I help you today?` }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    setIsLoading(true)
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>{companyData.name} Assistant</CardTitle>
          <CardDescription>{companyData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((m, index) => (
              <div key={index} className={`p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                <span className="font-bold">{m.role === 'user' ? 'You: ' : 'Assistant: '}</span>
                {m.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our products, services, policies..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
```

### Running the chatbot

Now run `npm run dev` again and your UI will look like this in `localhost:3000`

![final app UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1731433186067/8c671900-79e9-4311-b2bb-64e3962d85f0.png)

![final app UI 2](https://cdn.hashnode.com/res/hashnode/image/upload/v1731433199613/b02847cf-2909-4920-b21c-48159f04bfc2.png)

Here is the [GitHub repo](https://github.com/Arvind644/ai-chat-app) with source code for this application.

### Lessons Learned and Best Practices

Building this project has highlighted several important considerations for AI-powered applications:

- **Rate Limiting is Crucial:** It protects your application from abuse, manages costs, and ensures fair usage for all users.

- **Testing is Important:** Implementing a way to test your rate limiter helps ensure it's working as expected.

- **Environment Management:** Using environment variables for sensitive information like API keys is a must for security.

- **Error Handling:** Proper error handling, especially for rate limit errors, improves the user experience.

- **Scalability Considerations:** As your application grows, you may need to adjust your rate limiting strategy or implement more advanced queueing systems.

### Conclusion

Building an AI chat application with rate limiting is an excellent exercise in balancing functionality with responsible resource management. By implementing rate limiting and thorough testing, we've created an application that's not only powerful but also sustainable and fair.

As AI technology continues to advance, it's crucial for developers to implement these systems responsibly. Rate limiting is just one step in this direction, but it's an important one that can make a significant difference in the performance, cost-effectiveness, and fairness of your AI-powered applications.

Happy coding, and remember to always code responsibly!
