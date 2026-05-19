import type { ReactNode } from 'react'
import { Fragment } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { MotionPreset } from '@/components/ui/motion-preset'

import { cn } from '@/lib/utils'

type RowData = {
  name: string
  isKey?: boolean
  icon?: ReactNode
  isHighlighted?: boolean
  columnData: (string | ReactNode)[]
}[]

const CompareUILib = ({ rowdata }: { rowdata: RowData }) => {
  return (
    <div className='px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-24'>
      <div className='bg-muted mx-auto max-w-7xl space-y-16 rounded-xl px-8 py-16'>
        <div className='flex flex-col items-center gap-4'>
          <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur delay={0.7} transition={{ duration: 0.5 }}>
            <Badge variant='outline' className='text-sm font-normal'>
              Technology
            </Badge>
          </MotionPreset>
          <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur delay={0.5} transition={{ duration: 0.5 }}>
            <h1 className='text-center text-3xl font-semibold text-balance sm:text-4xl'>Our web stack</h1>
          </MotionPreset>

          <MotionPreset fade slide={{ direction: 'up', offset: 50 }} blur delay={0.3} transition={{ duration: 0.5 }}>
            <p className='text-muted-foreground mx-auto max-w-2xl text-center text-xl'>
              We choose proven, production-ready tools that keep products fast, maintainable and easy to scale.
            </p>
          </MotionPreset>
        </div>
        <MotionPreset fade blur delay={1.3} transition={{ duration: 0.5 }}>
          <Card className='border-primary/10 w-full overflow-x-auto px-6'>
            <CardContent className='min-w-180 overflow-y-auto rounded-xl border px-0 py-0'>
              <div className='grid gap-0' style={{ gridTemplateColumns: `repeat(${rowdata.length}, minmax(0, 1fr))` }}>
                {/* Header Row */}
                {rowdata.map((row, colIndex) => (
                  <div
                    key={`header-${row.name}-${colIndex}`}
                    className={cn(
                      'flex items-center border-b px-6 pt-4',

                      {
                        'bg-primary/5 mt-4 h-17.5 rounded-t-md border-x border-t pt-0': row.isHighlighted,
                        'border-r': colIndex === 0,
                        'h-21.5': !row.isHighlighted,
                        'justify-center': colIndex !== 0
                      }
                    )}
                  >
                    {row.isKey ? (
                      <h3 className='text-xl font-semibold'>{row.name}</h3>
                    ) : (
                      <div className='flex items-center justify-center gap-2.5'>
                        {row.icon && <div>{row.icon}</div>}
                        <h3 className='text-xl font-semibold'>{row.name}</h3>
                      </div>
                    )}
                  </div>
                ))}

                {/* Data Rows */}
                {rowdata[0].columnData.map((_, rowIndex) => (
                  <Fragment key={`cell-${rowdata[0].columnData[rowIndex]}-${rowIndex}`}>
                    {rowdata.map((col, colIndex) => (
                      <div
                        key={`cell-${col.name}-${rowIndex}-${colIndex}`}
                        className={cn('flex min-h-18 items-center px-6 py-4', {
                          'bg-primary/5 text-card-foreground! border-x': col.isHighlighted,
                          'border-r font-medium': colIndex === 0,
                          'text-muted-foreground text-sm': colIndex > 0 && colIndex < rowdata.length,
                          'border-b': col.isHighlighted || rowIndex !== col.columnData.length - 1,
                          'h-19 border-b-0 pb-4': !col.isHighlighted && rowIndex === col.columnData.length - 1,
                          'rounded-b-md pb-0!': col.isHighlighted && rowIndex === col.columnData.length - 1
                        })}
                      >
                        <div className={cn(colIndex === 0 ? '' : '')}>
                          {col.isKey ? (
                            <>
                              {col.columnData[rowIndex]}
                            </>
                          ) : (
                            col.columnData[rowIndex]
                          )}
                        </div>
                      </div>
                    ))}
                  </Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionPreset>
      </div>
    </div>
  )
}

export default CompareUILib
