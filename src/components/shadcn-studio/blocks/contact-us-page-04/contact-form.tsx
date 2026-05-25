'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createClient } from '@/utils/supabase/client'
import { Loader2, CheckCircle2 } from 'lucide-react'

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    help_type: '',
    budget: '',
    message: '',
    source: ''
  })

  const [countryCode, setCountryCode] = useState('+91')
  const [customCode, setCustomCode] = useState('+')
  const [isCustomCode, setIsCustomCode] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id === 'work-email' ? 'email' : id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Move createClient inside try-catch to catch invalid URL errors
      const supabase = createClient()
      const code = isCustomCode ? customCode : countryCode
      const combinedPhone = phoneNumber ? `${code} ${phoneNumber}`.trim() : ''
      
      const { error: submitError } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          country: combinedPhone,
          help_type: formData.help_type,
          budget: formData.budget,
          message: formData.message,
          source: formData.source
        }])

      if (submitError) throw submitError
      
      setIsSuccess(true)
      // Reset form
      setFormData({
        name: '', email: '', company: '', country: '', 
        help_type: '', budget: '', message: '', source: ''
      })
      setCountryCode('+91')
      setCustomCode('+')
      setIsCustomCode(false)
      setPhoneNumber('')
    } catch (err: any) {
      // Check if it's a URL/Configuration error
      if (err.message && err.message.includes('URL')) {
         setError('Supabase connection error: Please add your SUPABASE_URL and ANON_KEY to the .env file.')
      } else {
         setError(err.message || 'Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center space-y-4 rounded-xl border bg-emerald-50/50 p-8 text-center dark:bg-emerald-950/20">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
          <CheckCircle2 className="size-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">Message Sent!</h3>
          <p className="text-muted-foreground text-sm max-w-[300px]">
            Thank you for reaching out. An engineer will review your enquiry and get back to you within one working day.
          </p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => setIsSuccess(false)}
        >
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      
      {/* Row 1: Name + Work Email */}
      <div className='grid gap-5 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='name'>
            Name <span className='text-destructive'>*</span>
          </Label>
          <Input type='text' id='name' value={formData.name} onChange={handleChange} className='h-10' placeholder='Your full name' required disabled={isSubmitting} />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='work-email'>
            Work email <span className='text-destructive'>*</span>
          </Label>
          <Input type='email' id='work-email' value={formData.email} onChange={handleChange} className='h-10' placeholder='you@company.com' required disabled={isSubmitting} />
        </div>
      </div>

      {/* Row 2: Company + Phone Number */}
      <div className='grid gap-5 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='company'>Company name</Label>
          <Input type='text' id='company' value={formData.company} onChange={handleChange} className='h-10' placeholder='Your company' disabled={isSubmitting} />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Phone number</Label>
          <div className='flex gap-2'>
            {isCustomCode ? (
              <div className='flex gap-1 items-center shrink-0'>
                <Input
                  type='text'
                  value={customCode}
                  onChange={(e) => {
                    let val = e.target.value;
                    if (val && !val.startsWith('+')) {
                      val = '+' + val;
                    }
                    setCustomCode(val);
                  }}
                  className='w-[80px] h-10 bg-background text-center'
                  placeholder='+31'
                  disabled={isSubmitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="h-10 w-8 px-0 shrink-0 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setIsCustomCode(false);
                    setCountryCode('+91');
                  }}
                  title="Choose preset country code"
                >
                  ✕
                </Button>
              </div>
            ) : (
              <Select 
                value={countryCode} 
                onValueChange={(val) => {
                  if (val === 'other') {
                    setIsCustomCode(true);
                  } else {
                    setCountryCode(val || '+91');
                  }
                }} 
                disabled={isSubmitting}
              >
                <SelectTrigger className='w-[110px] h-10 shrink-0 bg-background'>
                  <SelectValue placeholder='+91' />
                </SelectTrigger>
                <SelectContent className='max-h-[300px] overflow-y-auto'>
                  <SelectItem value='+91'>🇮🇳 +91</SelectItem>
                  <SelectItem value='+1'>🇺🇸 +1</SelectItem>
                  <SelectItem value='+44'>🇬🇧 +44</SelectItem>
                  <SelectItem value='+971'>🇦🇪 +971</SelectItem>
                  <SelectItem value='+61'>🇦🇺 +61</SelectItem>
                  <SelectItem value='+65'>🇸🇬 +65</SelectItem>
                  <SelectItem value='+966'>🇸🇦 +966</SelectItem>
                  <SelectItem value='+49'>🇩🇪 +49</SelectItem>
                  <SelectItem value='+33'>🇫🇷 +33</SelectItem>
                  <SelectItem value='+81'>🇯🇵 +81</SelectItem>
                  <SelectItem value='other'>🌐 Other...</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Input
              type='tel'
              id='phone'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='h-10'
              placeholder='12345 67890'
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* What can we help with? */}
      <div className='space-y-2'>
        <Label htmlFor='help-type'>What can we help with?</Label>
        <Select value={formData.help_type} onValueChange={(val) => handleSelectChange('help_type', val || '')} disabled={isSubmitting}>
          <SelectTrigger id='help-type' className='h-10 w-full'>
            <SelectValue placeholder='Select an option' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='new-project'>New project</SelectItem>
            <SelectItem value='existing-project'>Existing project</SelectItem>
            <SelectItem value='hiring-team'>Hiring us as a team</SelectItem>
            <SelectItem value='partnership'>Partnership</SelectItem>
            <SelectItem value='press'>Press</SelectItem>
            <SelectItem value='careers'>Careers</SelectItem>
            <SelectItem value='other'>Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project budget */}
      <div className='space-y-2'>
        <Label htmlFor='budget'>Project budget (optional)</Label>
        <Select value={formData.budget} onValueChange={(val) => handleSelectChange('budget', val || '')} disabled={isSubmitting}>
          <SelectTrigger id='budget' className='h-10 w-full'>
            <SelectValue placeholder='Select a range' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='under-5l'>Under ₹5 Lakh</SelectItem>
            <SelectItem value='5l-15l'>₹5 – 15 Lakh</SelectItem>
            <SelectItem value='15l-50l'>₹15 – 50 Lakh</SelectItem>
            <SelectItem value='50l-1cr'>₹50 Lakh – 1 Crore</SelectItem>
            <SelectItem value='above-1cr'>Above ₹1 Crore</SelectItem>
            <SelectItem value='not-sure'>Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className='space-y-2'>
        <Label htmlFor='message'>
          Tell us briefly what you&apos;re building
        </Label>
        <Textarea
          id='message'
          value={formData.message}
          onChange={handleChange}
          className='h-28 resize-none'
          placeholder='Describe your project, goals, or questions...'
          maxLength={1000}
          disabled={isSubmitting}
        />
        <p className='text-muted-foreground text-xs'>Max 1000 characters</p>
      </div>

      {/* Where did you hear about us */}
      <div className='space-y-2'>
        <Label htmlFor='source'>Where did you hear about us? (optional)</Label>
        <Input type='text' id='source' value={formData.source} onChange={handleChange} className='h-10' placeholder='e.g. Google, LinkedIn, Referral' disabled={isSubmitting} />
      </div>

      <Button type='submit' className='w-full rounded-lg text-base' size='lg' disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  )
}

export default ContactForm
