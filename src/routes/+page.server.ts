import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const elements = [
    {
      title: "Title",
      id: 1,
      columnId: 1
    },
    {
      title: "paragraph",
      id: 2,
      columnId: 1
    },
  ]
  const columns = [
    {
      name: "Elements",
      id: 1
    },
    {
      name: "In Use",
      id: 2
    }
  ]

  return { columns, elements }
}
