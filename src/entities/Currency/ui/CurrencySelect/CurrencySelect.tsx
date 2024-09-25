import { Currency } from 'entities/Currency';
import { memo, useCallback } from 'react';
import { BoxList } from 'shared/ui/BoxList/BoxList';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
  {value: Currency.RUB, content: Currency.RUB},
  {value: Currency.EUR, content: Currency.EUR},
  {value: Currency.USD, content: Currency.USD}
]

export const CurrencySelect = memo(({value, onChange, readonly}: CurrencySelectProps) => {
  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])

  return (
    <BoxList
      //  className={classNames('', {}, [className])}
      value={value}
      label={'Укажите валюту'}
      onChange={onChangeHandler}
      items={options}
      defaultValue={'Укажите валюту'}
      readonly={readonly}
      direction='top right'
    />
  )
})