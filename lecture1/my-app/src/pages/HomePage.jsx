import HeroBanner from '../components/HeroBanner'
import NowShowing from '../components/NowShowing'
import NewMovie from '../components/NewMovie'
import ComingSoon from '../components/ComingSoon'
import EventSection from '../components/EventSection'

function HomePage() {
  return (
    <>
      <HeroBanner />
      <NowShowing />
      <NewMovie />
      <ComingSoon />
      <EventSection />
    </>
  )
}

export default HomePage
