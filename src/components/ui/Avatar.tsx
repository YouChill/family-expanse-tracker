// src/components/ui/Avatar.tsx
import { cn } from '@/lib/utils'

export interface AvatarProps {
  name: string
  src?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getColorFromName(name: string): string {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ]

  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }

  return colors[Math.abs(hash) % colors.length]
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  const initials = getInitials(name)
  const bgColor = getColorFromName(name)

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          'rounded-full object-cover',
          sizes[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-medium text-white',
        bgColor,
        sizes[size],
        className
      )}
      title={name}
    >
      {initials}
    </div>
  )
}

// Avatar group for showing multiple avatars
export interface AvatarGroupProps {
  avatars: { name: string; src?: string | null }[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

export function AvatarGroup({ avatars, max = 4, size = 'md' }: AvatarGroupProps) {
  const displayed = avatars.slice(0, max)
  const remaining = avatars.length - max

  const overlaps = {
    sm: '-ml-2',
    md: '-ml-3',
    lg: '-ml-4',
  }

  return (
    <div className="flex items-center">
      {displayed.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            'ring-2 ring-white rounded-full',
            index > 0 && overlaps[size]
          )}
        >
          <Avatar name={avatar.name} src={avatar.src} size={size} />
        </div>
      ))}

      {remaining > 0 && (
        <div
          className={cn(
            'ring-2 ring-white rounded-full flex items-center justify-center bg-gray-200 text-gray-600 font-medium',
            overlaps[size],
            size === 'sm' && 'h-8 w-8 text-xs',
            size === 'md' && 'h-10 w-10 text-sm',
            size === 'lg' && 'h-12 w-12 text-base'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
