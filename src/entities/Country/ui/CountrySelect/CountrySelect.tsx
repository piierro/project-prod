import { Country } from 'entities/Country';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';

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

export const CountrySelect = memo(({className, value, onChange, readonly}: CountrySelectProps) => {
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country)
  }, [onChange])

  return (
    <Select 
      className={classNames('', {}, [className])}
      label={'Укажите страну'}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
    />
  )
})