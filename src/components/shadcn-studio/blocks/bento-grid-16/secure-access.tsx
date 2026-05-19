import { CircleDollarSignIcon, HeadsetIcon, ServerCogIcon } from 'lucide-react'

const operatingTracks = [
  {
    icon: ServerCogIcon,
    label: 'Deploys',
    value: 'live',
    tone: 'bg-primary/10 text-primary'
  },
  {
    icon: CircleDollarSignIcon,
    label: 'Billing',
    value: 'synced',
    tone: 'bg-chart-3/15 text-chart-3'
  },
  {
    icon: HeadsetIcon,
    label: 'Support',
    value: 'triaged',
    tone: 'bg-chart-2/15 text-chart-2'
  }
]

const SecureAccess = () => {
  return (
    <div className='relative h-61.5 overflow-hidden px-6 pt-6'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(26,135,84,0.16),transparent_30%),linear-gradient(135deg,rgba(26,135,84,0.08),transparent_48%),repeating-linear-gradient(90deg,transparent_0_32px,rgba(14,20,16,0.04)_32px_33px)]' />
      <div className='absolute right-6 top-6 rounded-md bg-foreground px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-background'>
        operating
      </div>

      <div className='relative mx-auto max-w-82 rounded-xl border border-border/80 bg-card/88 p-2.5 shadow-[0_18px_45px_rgba(14,20,16,0.10)] backdrop-blur'>
        <div className='flex items-center justify-between border-b border-border/70 pb-2'>
          <div>
            <div className='text-sm font-semibold text-foreground'>Launch desk</div>
            <div className='mt-0.5 font-mono text-[11px] text-muted-foreground'>{'build -> ship -> run'}</div>
          </div>
          <div className='flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary'>
            <span className='size-1.5 rounded-full bg-primary' />
            on-call
          </div>
        </div>

        <div className='mt-2 grid gap-1.5'>
          {operatingTracks.map(track => {
            const Icon = track.icon

            return (
              <div key={track.label} className='flex items-center gap-2.5 rounded-lg bg-secondary/70 p-2'>
                <div className={`grid size-8 place-items-center rounded-md ${track.tone}`}>
                  <Icon className='size-3.5' />
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='text-[13px] font-medium leading-none text-foreground'>{track.label}</div>
                  <div className='mt-1 h-1.5 overflow-hidden rounded-full bg-border'>
                    <div className='h-full w-[78%] rounded-full bg-primary/70' />
                  </div>
                </div>
                <div className='font-mono text-[11px] text-muted-foreground'>{track.value}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SecureAccess
