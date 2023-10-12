import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const data = [
  {
    id: "qm1",
    title: "Hvilken type universitetsutdanning forfølger du?",
    type: "radio",
    answers: [
      { id: "qm1-am1", title: "Bachelorgrad" },
      { id: "qm1-am2", title: "Mastergrad" },
      { id: "qm1-am3", title: "Doktorgrad (Ph.D.)" },
      { id: "qm1-am4", title: "Annen utdanning" },
    ],
  },
  {
    id: "qm2",
    title:
      "Hvor viktig synes du det er å inkludere praktisk erfaring og internshipmuligheter i universitetsutdanningen?",
    type: "radio",
    answers: [
      { id: "qm2-am1", title: "Meget viktig" },
      { id: "qm2-am2", title: "Viktig" },
      { id: "qm2-am3", title: "Lite viktig" },
      { id: "qm2-am4", title: "Ikke viktig i det hele tatt" },
    ],
  },
  {
    id: "qm3",
    title:
      "Hvordan vurderer du kvaliteten på online undervisning og ressurser som er tilgjengelige for universitetsstudenter?",
    type: "radio",
    answers: [
      { id: "qm3-am1", title: "Meget bra" },
      { id: "qm3-am2", title: "Bra" },
      { id: "qm3-am3", title: "Dårlig" },
      { id: "qm3-am4", title: "Har ikke brukt online ressurser" },
    ],
  },
  {
    id: "qm4",
    title:
      "Hvordan opplever du tilgjengeligheten av digitale læringsressurser og verktøy i din universitetsutdanning?",
    type: "checkbox",
    answers: [
      { id: "qm4-am1", title: "God tilgjengelighet" },
      { id: "qm4-am2", title: "Middels tilgjengelighet" },
      { id: "qm4-am3", title: "Dårlig tilgjengelighet" },
      { id: "qm4-am4", title: "Vet ikke" },
    ],
  },
]

export function GET() {
  return NextResponse.json(data, { status: 200 })
}

export async function POST(request: NextRequest) {
  console.log(request.body)
  console.log(request)
  // console.log(request.body)
  const data = await request.json()
  console.log(data)
  return NextResponse.json(data, { status: 200 })
}
