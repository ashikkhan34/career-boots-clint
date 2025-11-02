import React from 'react'
import Hero from './Components/Hero/Hero'
import AllCourse from './Components/AllCourse/AllCourse'
import AllMentor from './Components/AllMentor/AllMentor'
import Question from './Components/Questons/Question'
import CareerBootsFeaturesPage from './Components/Features/Feature'

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <AllCourse></AllCourse>
      <AllMentor></AllMentor>
      <Question></Question>
      <CareerBootsFeaturesPage></CareerBootsFeaturesPage>
    </div>
  )
}
