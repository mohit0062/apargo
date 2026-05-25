// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className, src }: { className?: string; src?: string }) => {
  const logoSrc = src || '/group-2.svg'
  return (
    <div className={cn('flex items-center', className)}>
      <img src={logoSrc} alt='Apargo' className='h-9 w-auto max-w-42 object-contain' />
    </div>
  )
}

export default Logo
