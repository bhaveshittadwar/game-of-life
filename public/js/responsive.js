const responsive = () => {
  const dimensions = {}
  const isMobile = checkScreenResolution(370)
  const isDesktop = checkScreenResolution(992)

  dimensions.size = 375
  dimensions.scale = 1.5

  if(isMobile) {
    dimensions.size = 400
    dimensions.scale = 1.6
  }
  
  if(isDesktop) {
    dimensions.size = 750
    dimensions.scale = 3
  }
  return dimensions
}

const checkScreenResolution = (device) => {
  const mediaChecker = window.matchMedia(`(min-width: ${device}px)`)
  return mediaChecker.matches
}