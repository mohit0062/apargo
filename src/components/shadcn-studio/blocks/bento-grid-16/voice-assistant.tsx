import { ActivityIcon, BellRingIcon, GitBranchIcon, LifeBuoyIcon } from 'lucide-react'

const runbookItems = [
  {
    icon: ActivityIcon,
    label: 'Uptime',
    value: '99.9%'
  },
  {
    icon: BellRingIcon,
    label: 'Alerts',
    value: 'watched'
  },
  {
    icon: GitBranchIcon,
    label: 'Releases',
    value: 'weekly'
  }
]

const VoiceAssistant = () => {
  return (
    <div className='relative flex h-61.5 items-center justify-center overflow-hidden px-6 pt-6'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(26,135,84,0.18),transparent_26%),linear-gradient(180deg,rgba(250,248,244,0.48),transparent_72%)]' />
      <div className='absolute left-1/2 top-8 h-20 w-px -translate-x-1/2 bg-border/70' />

      <div className='relative w-full max-w-76 rounded-xl border border-border/80 bg-card/90 p-3 shadow-[0_20px_60px_rgba(14,20,16,0.12)] backdrop-blur'>
        <div className='flex items-center justify-between border-b border-border/70 pb-3'>
          <div className='flex items-center gap-2.5'>
            <div className='grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(26,135,84,0.24)]'>
              <LifeBuoyIcon className='size-4.5' />
            </div>
            <div>
              <div className='text-sm font-semibold leading-none text-foreground'>Post-launch desk</div>
              <div className='mt-1.5 font-mono text-[11px] leading-none text-muted-foreground'>support / scale / improve</div>
            </div>
          </div>
          <span className='size-2 rounded-full bg-primary' />
        </div>

        <div className='mt-3 space-y-1.5'>
          {runbookItems.map(item => {
            const Icon = item.icon

            return (
              <div key={item.label} className='flex items-center gap-2.5 rounded-lg bg-secondary/70 p-2'>
                <div className='grid size-8 shrink-0 place-items-center rounded-md bg-background text-primary ring-1 ring-border/80'>
                  <Icon className='size-3.5' />
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='text-[13px] font-medium leading-none text-foreground'>{item.label}</div>
                  <div className='mt-1.5 h-1.5 overflow-hidden rounded-full bg-border'>
                    <div className='h-full w-[82%] rounded-full bg-primary/75' />
                  </div>
                </div>
                <div className='font-mono text-[11px] text-muted-foreground'>{item.value}</div>
              </div>
            )
          })}
        </div>

        <div className='mt-3 rounded-lg border border-border/80 bg-background/75 p-2.5'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-xs font-medium text-muted-foreground'>Next check-in</span>
            <span className='font-mono text-[11px] text-primary'>Friday, 10:30</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceAssistant
