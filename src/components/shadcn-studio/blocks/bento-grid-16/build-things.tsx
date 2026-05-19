import { CalendarCheckIcon, Clock3Icon, MessageCircleIcon } from 'lucide-react'

const overlapWindows = [
  {
    region: 'US',
    window: '09:00-13:00',
    width: 'w-[46%]',
    offset: 'ml-[44%]'
  },
  {
    region: 'EU',
    window: '10:00-16:00',
    width: 'w-[58%]',
    offset: 'ml-[22%]'
  },
  {
    region: 'ME',
    window: '11:00-18:00',
    width: 'w-[64%]',
    offset: 'ml-[12%]'
  },
  {
    region: 'APAC',
    window: '08:00-14:00',
    width: 'w-[52%]',
    offset: 'ml-[2%]'
  }
]

const deliveryNotes = [
  {
    icon: CalendarCheckIcon,
    label: 'Stand-ups',
    value: 'your hours'
  },
  {
    icon: MessageCircleIcon,
    label: 'Async updates',
    value: 'daily'
  },
  {
    icon: Clock3Icon,
    label: 'Overlap',
    value: '4 regions'
  }
]

const BuildThings = () => {
  return (
    <div className='relative min-h-75 overflow-hidden px-6 pt-6'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(26,135,84,0.16),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(191,142,65,0.12),transparent_30%),repeating-linear-gradient(90deg,transparent_0_46px,rgba(14,20,16,0.04)_46px_47px)]' />

      <div className='relative mx-auto mt-4 max-w-155 rounded-xl border border-border/80 bg-card/90 p-3 shadow-[0_22px_70px_rgba(14,20,16,0.12)] backdrop-blur'>
        <div className='flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3'>
          <div>
            <div className='text-sm font-semibold text-foreground'>Timezone coverage</div>
            <div className='mt-0.5 font-mono text-[11px] text-muted-foreground'>US / EU / Middle East / APAC</div>
          </div>
          <div className='rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary'>live overlap</div>
        </div>

        <div className='mt-4 grid gap-2.5'>
          {overlapWindows.map(item => (
            <div key={item.region} className='grid grid-cols-[3.5rem_1fr_4.75rem] items-center gap-3'>
              <div className='font-mono text-xs font-medium text-foreground'>{item.region}</div>
              <div className='h-6 overflow-hidden rounded-md bg-secondary ring-1 ring-border/60'>
                <div className={`${item.offset} ${item.width} h-full rounded-md bg-primary/75 shadow-[0_8px_24px_rgba(26,135,84,0.25)]`} />
              </div>
              <div className='text-right font-mono text-[11px] text-muted-foreground'>{item.window}</div>
            </div>
          ))}
        </div>

        <div className='mt-4 grid gap-2 sm:grid-cols-3'>
          {deliveryNotes.map(note => {
            const Icon = note.icon

            return (
              <div key={note.label} className='rounded-lg bg-secondary/70 p-2.5'>
                <div className='flex items-center gap-2'>
                  <div className='grid size-7 place-items-center rounded-md bg-background text-primary ring-1 ring-border/80'>
                    <Icon className='size-3.5' />
                  </div>
                  <div className='min-w-0'>
                    <div className='text-[13px] font-medium leading-none text-foreground'>{note.label}</div>
                    <div className='mt-1.5 font-mono text-[11px] leading-none text-muted-foreground'>{note.value}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className='from-card pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent' />
    </div>
  )
}

export default BuildThings
