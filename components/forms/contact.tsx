"use client"

import { ContactSchema } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'

 function ContactForm() {
  const [isLoading, setIsLoading]  = useState(false)

    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
                message: "",
                email: "",
                name:"",
        },
      })
      function onSubmit(values: z.infer<typeof ContactSchema>) {
        setIsLoading(true)
          const telegramBotId = process.env.NEXT_PUBLIC_TG_BOT_API!
          const telegramChatID = process.env.NEXT_PUBLIC_TG_CHAT_ID!

          const promise = fetch(`https://api.telegram.org/bot${telegramBotId}/sendMessage`, {

              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "cache-control": "no-cache",
              },
              body: JSON.stringify({
                  chat_id: telegramChatID,
                  text: `Name:${values.name}:
                  email:${values.email}:
                    message:${values.message}`
              }),

          }).then(()=> form.reset())
          .finally(()=>setIsLoading(false))

          toast.promise(promise, {
            loading:"Loading",
            success:"Successfully sent!",
            error:"Something went wrong"
          })
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
            name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <Textarea
              disabled={isLoading}
              className="resize-none h-32"
              placeholder="Ask question or just say Hi"
              {...field}
            />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
            name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <Input
               disabled={isLoading}
              placeholder='Email address'
              {...field}
            />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
            name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <Input
               disabled={isLoading}
              placeholder="Your name here"
              {...field}
            />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" size={"lg"} type='submit' disabled={isLoading}>
              <span>Send</span>
              <Send className="w-4 h-4 ml-2" />
            </Button>
      </form>
    </Form>
  )

}
export default ContactForm
