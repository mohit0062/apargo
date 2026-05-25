'use client'

import { useEffect } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center'>
      <p className='text-muted-foreground text-sm font-medium uppercase tracking-widest'>Error</p>
      <h1 className='text-3xl font-semibold md:text-4xl'>Something went wrong</h1>
      <p className='text-muted-foreground max-w-md text-lg'>
        An unexpected error occurred. Try again or return home.
      </p>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Button size='lg' onClick={reset}>
          Try again
        </Button>
        <Button variant='outline' size='lg' render={<Link href='/' />}>
          Go home
        </Button>
      </div>
    </main>
  )
}
