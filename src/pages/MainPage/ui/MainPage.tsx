import { ReitingCard } from '@/entities/Reiting';
import { Page } from '@/widgetes/Page/Page';

const MainPage = () => {
  return (
    <Page>
      <div>Главная страница</div>
      <ReitingCard 
        title='Как вам статья?'
        feedBackTitle='Оставьте отзыв о статье'
        hasFeedBack
      />
    </Page>
  )
}

export default MainPage
