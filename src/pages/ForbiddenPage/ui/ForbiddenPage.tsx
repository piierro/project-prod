import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text';
import { Page } from '@/widgetes/Page';
import * as cls from './ForbiddenPage.module.scss';

const ForbiddenPage = () => {
  return (
    <Page className={cls.forbidden}>
      <Text 
        title='Доступ запрещен' 
        align={TextAlign.CENTER}
        theme={TextTheme.ERROR}
        size={TextSize.L}
      />
    </Page>
  )
}

export default ForbiddenPage;
