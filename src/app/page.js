import React from 'react'
import Hero from './Components/Hero/Hero'
import Feature from './Components/Feature/Feature'
import AllCourse from './Components/AllCourse/AllCourse'
import AllMentor from './Components/AllMentor/AllMentor'
import Question from './Components/Questons/Question'

export default function page() {
  return (
    <div>
      <Hero></Hero>
      <AllCourse></AllCourse>
      <AllMentor></AllMentor>
      <Feature></Feature>
      <Question></Question>
    </div>
  )
}
