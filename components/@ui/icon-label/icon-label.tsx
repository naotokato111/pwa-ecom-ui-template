import { Icon } from '@ui/icon/icon'
import { Label } from '@ui/label/label'

export type LabelPosition = 'top' | 'bottom' | 'left' | 'right'

export type IconLabelProps = {
  icon?: any
  label?: string
  labelPosition?: LabelPosition
  className?: string
  labelTheme?: string
}

export function IconLabel({
  icon,
  label,
  labelPosition = 'bottom',
  className = '',
  labelTheme,
}: IconLabelProps) {
  let posStyle: string
  switch (labelPosition) {
    case 'top':
      posStyle = 'flex-col-reverse'
      break
    case 'left':
      posStyle = 'flex-row-reverse'
      break
    case 'right':
      posStyle = 'flex-row'
      break
    case 'bottom':
    default:
      posStyle = 'flex-col'
      break
  }

  return (
    <div className={`flex ${posStyle} gap-0.5 items-center ${className}`}>
      {icon && <Icon icon={icon} />}
      {label && <Label label={label} theme={labelTheme} />}
    </div>
  )
}
