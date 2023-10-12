type PageProps = { params: { id: string } }
export default function ChallengePage(props: PageProps) {
  const { params } = props
  return <p>Nå må du gjerne klage {params.id}</p>
}
