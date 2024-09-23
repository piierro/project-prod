import { Flex, FlexProps } from '../Flex/Flex';

export type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = (props: HStackProps) => {
  return (
    <Flex {...props} direction='row'/>
  )
}