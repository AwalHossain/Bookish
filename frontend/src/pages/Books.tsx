
import { Dialog, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { debounce } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookDetails from '../components/BookDetails'
import { useFilterBooksQuery } from '../redux/feature/filter/filterApi'
import { useAppSelector } from '../redux/hooks'
import { IBook } from '../types'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'genre', href: '#' },
  { name: 'publicationYear', href: '#' },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Books() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [genre, setGenre] = useState('')
  const [publicationYear, setPublicationYear] = useState('')
  const [searchQuery, setSearchQuery] = useState('');
  const { book } = useAppSelector(state => state.bookState)

  const searchParams = new URLSearchParams();
  if (searchQuery) searchParams.append('searchTerm', searchQuery);
  if (genre) searchParams.append('genre', genre);
  if (publicationYear) searchParams.append('publicationYear', publicationYear);

  const { data: books, refetch, isFetching, isSuccess } = useFilterBooksQuery(
    `?${searchParams.toString()}`
  )

 // Check if books is defined before assigning it to bookContent

let bookContent: IBook[] = books?.data ?? [];


  const debouncedRefetch = debounce(refetch, 500);

  useEffect(() => {
    // Call the debounced function whenever searchQuery, genre, or publicationYear changes
    debouncedRefetch();

    // Clean up the debounced function on unmount
    return () => {
      debouncedRefetch.cancel();
    };
  }, [genre, publicationYear, searchQuery]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setGenre('');
    setPublicationYear('');
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {/* {subCategories.map((category) => ( */}
                      <li
                      >
                        <select
                          // onChange={(e) => dispatch(filter(e.target.value))}
                          className="select border-2 border-slate-500 select-ghost w-full max-w-[200px]"
                        >
                          <option disabled selected>
                            Pick a Genre
                          </option>
                          <option value="Self-Help">Self-Help</option>
                          <option value="Fiction">Fiction</option>
                          <option value="Non-Fiction">Non-Fiction</option>
                          <option value="Academic">Academic</option>
                          <option value="Classic">Classic</option>
                          <option value="Religion">Religion</option>
                          <option value="Adventure">Adventure</option>
                        </select>
                        <button
                          // onClick={() => dispatch(clearFilter())}
                          className="btn btn-secondary"
                        >
                          Clear
                        </button>
                      </li>
                      <li>
                        Publication Year
                      </li>
                    </ul>

                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">


            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-indigo-700 leading-tight mt-8 mb-4 relative">
              New Arrivals
              <svg className="hidden md:inline absolute -top-8 right-0 h-8 w-8 text-yellow-500 animate-bounce" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" />
                <path fillRule="evenodd" d="M10 3a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </h1>

            {/* Add Book Link */}
            <h1 className="text-4xl md:text-3xl font-bold tracking-tight text-indigo-700 leading-tight mb-4">
              <Link to="/addbook" className="hover:text-indigo-900 transition-colors duration-300">
                Add Book
              </Link>
            </h1>



            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                {/* <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                > */}
                {/* <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition> */}
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  <li
                  >
                    <input
                      className="border rounded-l py-2 px-4 w-64 focus:outline-none focus:ring focus:border-blue-300"
                      type="text"
                      placeholder="Search books"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select
                      onChange={(e) => setGenre((e.target.value))}
                      className="select border-2 py-2 w-64 px-4 my-2 border-slate-500 select-ghost w-full max-w-[200px]"
                    >
                      <option disabled selected>
                        Pick a Genre
                      </option>
                      {
                        book?.map((book) => (
                          <option key={book._id} value={book.genre}>
                            {book.genre}
                          </option>
                        ))
                      }
                    </select>

                  </li>
                  <li>

                    <select
                      onChange={(e) => setPublicationYear((e.target.value))}
                      className="select border-2 border-slate-500 select-ghost w-full max-w-[200px]"
                    >
                      <option disabled selected>
                        Pick Publication Year
                      </option>
                      {
                        book?.map((book) => (
                          <option key={book._id} value={book.publicationYear}>
                            {book.publicationYear}
                          </option>
                        ))
                      }
                    </select>
                  </li>
                  <button
                    onClick={() => handleClearFilters()}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                  >
                    Clear Filter
                  </button>

                </ul>

              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className='container'>

                  <div className='grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 px-5'>
                    {
                      isFetching ? <h1>Loading...</h1> :
                        isSuccess && bookContent?.map((book: IBook, index: number) => <BookDetails book={book} key={index} />)
                    }

                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
