const getData = <T>() => {
  const fetcher = async (url: string): Promise<T> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      throw new Error(`Error fetching data from ${url}: ${res.statusText}`)
    }
    return res.json()
  }

  return { fetcher }
}

export default getData
