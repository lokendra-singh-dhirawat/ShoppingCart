import * as React from "react"
import { Clock, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


const initialRecentSearches = [
  "Shirts for men",
  "jeans for women",
  "Shoes for kids",
  "Shoes for men",
  "Shoes for women",
]

export function PopupSearch() {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [recentSearches, setRecentSearches] = React.useState(initialRecentSearches)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      setRecentSearches((prev) => [searchValue, ...prev.filter((s) => s !== searchValue).slice(0, 4)])
      setSearchValue("")
      setOpen(false)
    }
  }

  const removeSearch = (searchToRemove: string) => {
    setRecentSearches((prev) => prev.filter((search) => search !== searchToRemove))
  }

  const clearAllSearches = () => {
    setRecentSearches([])
  }

  const selectRecentSearch = (search: string) => {
    setSearchValue(search)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button  size="icon" className="rounded-full">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <form onSubmit={handleSearch}>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              ref={inputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="flex h-10 w-full rounded-md border-0 bg-white py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-9 w-9 shrink-0 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </form>

        {recentSearches.length > 0 ? (
          <div className="px-2 py-3">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                Recent searches
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearAllSearches}>
                Clear all
              </Button>
            </div>
            <div className="space-y-1">
              {recentSearches.map((search, i) => (
                <div
                  key={search}
                  className="flex items-center gap-2 px-2 py-1  hover:bg-accent hover:text-accent-foreground"
                >
                  <button type="button" className="flex-1 text-sm text-left" onClick={() => selectRecentSearch(search)}>
                    {search}
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0   group-hover:opacity-100"
                    onClick={() => removeSearch(search)}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Remove search</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-6 px-4 text-center text-sm text-muted-foreground">No recent searches</div>
        )}
      </PopoverContent>
    </Popover>
  )
}

