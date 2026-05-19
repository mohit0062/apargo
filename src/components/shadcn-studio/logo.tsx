// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <img src='/group.svg' alt='Apargo' className='h-9 w-auto max-w-42' />
    </div>
  )
}

export default Logo
