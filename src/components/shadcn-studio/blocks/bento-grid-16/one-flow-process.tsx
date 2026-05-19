import { Code2Icon, GitPullRequestArrowIcon, ServerCogIcon } from 'lucide-react'

const seniorSignals = [
  {
    icon: Code2Icon,
    label: 'Architecture',
    value: 'senior owned'
  },
  {
    icon: GitPullRequestArrowIcon,
    label: 'Code review',
    value: '2-pass'
  },
  {
    icon: ServerCogIcon,
    label: 'Production',
    value: 'run-ready'
  }
]

const OneFlowProcess = () => {
  return (
    <div className='relative flex h-61.5 items-center justify-center overflow-hidden px-6 pt-6'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(26,135,84,0.18),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(191,142,65,0.12),transparent_26%),linear-gradient(180deg,rgba(250,248,244,0.48),transparent_70%)]' />
      <div className='absolute inset-x-6 top-8 h-px bg-border/80' />
      <div className='absolute inset-y-12 left-1/2 w-px -translate-x-1/2 bg-border/70' />

      <div className='relative w-full max-w-86'>
        <div className='rounded-xl border border-border/80 bg-card/90 p-3 shadow-[0_20px_60px_rgba(14,20,16,0.12)] backdrop-blur'>
          <div className='grid grid-cols-[1fr_auto] gap-3 border-b border-border/70 pb-3'>
            <div>
              <div className='text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground'>team mix</div>
              <div className='mt-1 text-4xl font-semibold leading-none tracking-tight text-foreground'>4 / 5</div>
            </div>
            <div className='flex items-end pb-1 text-right font-mono text-[11px] leading-4 text-muted-foreground'>
              mid-to-senior
              <br />
              engineers
            </div>
          </div>

          <div className='mt-3 grid grid-cols-5 gap-1.5' aria-hidden='true'>
            {[0, 1, 2, 3, 4].map(index => (
              <div
                key={index}
                className={`h-14 rounded-md ${
                  index < 4
                    ? 'bg-primary shadow-[inset_0_-12px_24px_rgba(14,20,16,0.16)]'
                    : 'border border-dashed border-border bg-secondary'
                }`}
              />
            ))}
          </div>

          <div className='mt-3 space-y-1.5'>
            {seniorSignals.map(signal => {
              const Icon = signal.icon

              return (
                <div key={signal.label} className='flex items-center gap-2 rounded-lg bg-secondary/70 px-2.5 py-2'>
                  <div className='grid size-7 shrink-0 place-items-center rounded-md bg-background text-primary ring-1 ring-border/80'>
                    <Icon className='size-3.5' />
                  </div>
                  <div className='min-w-0 flex-1 text-[13px] font-medium leading-none text-foreground'>{signal.label}</div>
                  <div className='font-mono text-[11px] text-muted-foreground'>{signal.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OneFlowProcess
