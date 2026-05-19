import { CheckIcon, ClockIcon, MessageSquareWarningIcon, XIcon } from 'lucide-react'

const decisionRows = [
  {
    label: 'User value',
    verdict: 'keep',
    detail: 'solves a real workflow'
  },
  {
    label: 'Timeline fit',
    verdict: 'push back',
    detail: 'scope is too wide'
  },
  {
    label: 'Maintenance',
    verdict: 'reshape',
    detail: 'reduce future drag'
  }
]

const PickYourTool = () => {
  return (
    <div className='relative h-61.5 overflow-hidden px-6 pt-6'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(191,142,65,0.16),transparent_28%),linear-gradient(135deg,rgba(26,135,84,0.08),transparent_42%),repeating-linear-gradient(0deg,transparent_0_30px,rgba(14,20,16,0.04)_30px_31px)]' />
      <div className='absolute left-6 top-6 rounded-md bg-foreground px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-background'>
        early pushback
      </div>

      <div className='relative mx-auto mt-9 max-w-86 rounded-xl border border-border/80 bg-card/90 p-3 shadow-[0_20px_60px_rgba(14,20,16,0.12)] backdrop-blur'>
        <div className='flex items-start gap-3 border-b border-border/70 pb-3'>
          <div className='grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20'>
            <MessageSquareWarningIcon className='size-5' />
          </div>
          <div className='min-w-0'>
            <div className='text-sm font-semibold leading-5 text-foreground'>Scope review</div>
            <div className='mt-0.5 text-xs leading-5 text-muted-foreground'>A better no comes before the build starts.</div>
          </div>
        </div>

        <div className='mt-3 space-y-1.5'>
          {decisionRows.map(row => (
            <div key={row.label} className='grid grid-cols-[1fr_auto] gap-3 rounded-lg bg-secondary/70 p-2.5'>
              <div>
                <div className='text-[13px] font-medium leading-none text-foreground'>{row.label}</div>
                <div className='mt-1.5 text-xs leading-none text-muted-foreground'>{row.detail}</div>
              </div>
              <div
                className={`flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-semibold ${
                  row.verdict === 'keep'
                    ? 'bg-primary/10 text-primary'
                    : row.verdict === 'push back'
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-[color-mix(in_oklab,var(--chart-3)_18%,var(--card))] text-chart-3'
                }`}
              >
                {row.verdict === 'keep' ? (
                  <CheckIcon className='size-3.5' />
                ) : row.verdict === 'push back' ? (
                  <XIcon className='size-3.5' />
                ) : (
                  <ClockIcon className='size-3.5' />
                )}
                {row.verdict}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-3 rounded-lg border border-border/80 bg-background/75 px-3 py-2'>
          <div className='flex items-center justify-between gap-3'>
            <span className='text-xs font-medium text-muted-foreground'>Decision</span>
            <span className='font-mono text-[11px] text-primary'>trim scope, ship useful</span>
          </div>
        </div>
      </div>

      <div className='from-card pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent' />
    </div>
  )
}

export default PickYourTool
