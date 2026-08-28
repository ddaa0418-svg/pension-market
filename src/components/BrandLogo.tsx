import logo from '../assets/logo.png'

type BrandLogoProps = {
  className?: string
}

export function BrandLogo({ className = 'h-9 w-auto' }: BrandLogoProps) {
  return <img src={logo} alt="연금마켓" className={className} />
}
