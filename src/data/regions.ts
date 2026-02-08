import portugalFlag from "@/assets/images/countries/portugal.svg"
import angolaFlag from "@/assets/images/countries/angola.svg"
import mozambiqueFlag from "@/assets/images/countries/mozambique.svg"
import capeVerdeFlag from "@/assets/images/countries/cape-verde.svg"
import guineaBissauFlag from "@/assets/images/countries/guinea-bissau.svg"
import saoTomeFlag from "@/assets/images/countries/sao-tome-and-prince.svg"

export const regions = [
  { id: "portugal", nameKey: "portugal", flag: portugalFlag },
  { id: "angola", nameKey: "angola", flag: angolaFlag },
  { id: "mozambique", nameKey: "mozambique", flag: mozambiqueFlag },
  { id: "cape-verde", nameKey: "capeVerde", flag: capeVerdeFlag },
  { id: "guinea-bissau", nameKey: "guineaBissau", flag: guineaBissauFlag },
  { id: "sao-tome", nameKey: "saoTome", flag: saoTomeFlag },
  { id: "other", nameKey: "otherRegions", icon: "globe" }
] as const

export type RegionId = typeof regions[number]["id"]
