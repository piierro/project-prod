import { Country } from '../../model/types/country';
import { memo, useCallback } from 'react';
import { BoxList } from '@/shared/ui/Popups';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
  {value: Country.America, content: Country.America},
  {value: Country.Japan, content: Country.Japan},
  {value: Country.Korea, content: Country.Korea},
  {value: Country.Russia, content: Country.Russia}
]

export const CountrySelect = memo(({ value, onChange, readonly}: CountrySelectProps) => {
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <BoxList
      //  className={classNames('', {}, [className])}
      value={value}
      label={'Укажите страну'}
      onChange={onChangeHandler}
      items={options}
      defaultValue={'Укажите страну'}
      readonly={readonly}
      direction='top right'
    />
  )
})