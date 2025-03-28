import { useRouter } from 'next/navigation'

export function useGoPath() {
  const router = useRouter()

  const goPath = (path) => {
    router.push(path)
  }

  return goPath
}