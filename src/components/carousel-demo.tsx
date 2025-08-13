import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"
import AutoplayPlugin from "embla-carousel-autoplay"
import sweatShirt from '../Images/sweatShirt.jpg';
import sweater from '../Images/sweater.avif';
import tShirt from '../Images/tShirt.jpg';
import suit from '../Images/suit.jpg';
import menAccessories from '../Images/menAccessories.avif';
import gold from '../Images/gold.avif';
import shoes1 from '../Images/shoes1.avif';
import shoes2 from '../Images/shoes2.avif';
import shoes3 from '../Images/shoes3.avif';
import shoes5 from '../Images/shoes5.avif';
import womenbag from '../Images/womenbag.webp';
import womenJwellery1 from '../Images/womenJwellery1.jpg';

// Custom hook for autoplay carousel with pause on hover
function useAutoplayCarousel(options = { delay: 3000, stopOnInteraction: false }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [AutoplayPlugin(options)])

  const [isHovered, setIsHovered] = React.useState(false)

  React.useEffect(() => {
    if (emblaApi) {
      emblaApi.on("pointerDown", () => {
        const autoplayPlugin = emblaApi.plugins().autoplay
        if (autoplayPlugin) autoplayPlugin.stop()
      })

      emblaApi.on("init", () => {
        const autoplayPlugin = emblaApi.plugins().autoplay
        if (autoplayPlugin) autoplayPlugin.play()
      })
    }
  }, [emblaApi])

  React.useEffect(() => {
    if (emblaApi) {
      const autoplayPlugin = emblaApi.plugins().autoplay
      if (autoplayPlugin) {
        if (isHovered) {
          autoplayPlugin.stop()
        } else {
          autoplayPlugin.play()
        }
      }
    }
  }, [emblaApi, isHovered])

  const handleMouseEnter = React.useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = React.useCallback(() => setIsHovered(false), [])

  return { emblaRef, handleMouseEnter, handleMouseLeave }
}

function CarouselDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  React.useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (api) {
        api.scrollNext()
      }
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(autoplayInterval)
  }, [api])

  const items = [
    { id: 1, image: sweatShirt },
    { id: 2, image: tShirt },
    { id: 3, image: gold },
    { id: 4, image: sweater },
    { id: 5, image: suit },
    { id: 6, image: menAccessories },
    { id: 7, image: shoes1 },
    { id: 8, image: shoes2 },
    { id: 9, image: shoes3 },
    { id: 10, image: shoes5 },
    { id: 11, image: womenbag },
    { id: 12, image: womenJwellery1 },
  ]

  return (
    <Carousel setApi={setApi} className="w-full h-full ">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-full items-center justify-center p-0">
                <img src={item.image} alt={item.id.toString()} className="Images" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
 
export default CarouselDemo;
