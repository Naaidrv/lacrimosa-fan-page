let currentSlide = 0
const slides = document.querySelectorAll(".slide")
const totalSlides = slides.length

// Initialize slider
function initSlider() {
  showSlide(0)
  startCountdown()
}

// Show specific slide
function showSlide(index) {
  // Remove active class from all slides
  slides.forEach((slide) => slide.classList.remove("active"))

  // Add active class to current slide
  slides[index].classList.add("active")

  currentSlide = index
}

// Next slide
function nextSlide() {
  const nextIndex = (currentSlide + 1) % totalSlides
  showSlide(nextIndex)
}

// Previous slide
function previousSlide() {
  const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides
  showSlide(prevIndex)
}

// Countdown functionality
function startCountdown() {
  // Target dates for each slide
  const targetDates = [
    new Date("2026-08-22T20:00:00"), // Slide 1
    new Date("2026-08-23T20:00:00"), // Slide 2
    null, // Slide 3 (no countdown)
  ]

  function updateCountdown() {
    targetDates.forEach((targetDate, index) => {
      if (!targetDate) return

      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        // Update countdown for each slide
        const slideIndex = index + 1
        const daysElement = document.getElementById(`days${slideIndex}`)
        const hoursElement = document.getElementById(`hours${slideIndex}`)
        const minutesElement = document.getElementById(`minutes${slideIndex}`)
        const secondsElement = document.getElementById(`seconds${slideIndex}`)

        if (daysElement) daysElement.textContent = days.toString().padStart(3, "0")
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, "0")
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, "0")
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, "0")
      }
    })
  }

  // Update countdown immediately and then every second
  updateCountdown()
  setInterval(updateCountdown, 1000)
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      previousSlide()
      break
    case "ArrowRight":
      nextSlide()
      break
  }
})

// Touch/swipe support for mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      nextSlide()
    } else {
      // Swipe right - previous slide
      previousSlide()
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initSlider)

// Smooth scroll for navigation links (if needed)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    // Add smooth scroll behavior if linking to sections
  })
})
