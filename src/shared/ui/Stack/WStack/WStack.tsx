import { Flex, FlexProps } from '../Flex/Flex';

export type WStackProps = Omit<FlexProps, 'direction'>

export const WStack = (props: WStackProps) => {
  const { align = 'start'} = props
  return (
    <Flex {...props} direction='column' align={align} />
  )
}