export function TableHead(props: { headers: string[] }) {
  const { headers } = props
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {headers.map((header) => (
          <th key={header} scope="col" className="px-6 py-3 capitalize">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
