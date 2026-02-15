import { Link } from 'react-router-dom'

const SearchResultsSection = ({ keyword, results }) => {
  return (
    <section className="bg-[#14181D] py-12 text-white">
      <div className="mx-auto w-full max-w-[120rem] px-4 sm:px-6">
        <p className="text-xs tracking-[0.12em] text-white/65 sm:text-sm">
          Search keyword: <span className="text-[#7DC242]">{keyword}</span>
        </p>

        {results.length > 0 ? (
          <div className="mt-5 space-y-3">
            {results.map((item) => (
              <Link
                key={`${item.type}-${item.title}`}
                to={item.to}
                className="block rounded-sm border border-white/10 bg-[#1F2328] p-4 hover:border-[#7DC242]/60"
              >
                <p className="text-xs tracking-[0.1em] text-white/55">{item.type}</p>
                <h3 className="mt-1 text-lg font-medium sm:text-xl">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70">{item.desc}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-sm border border-white/10 bg-[#1F2328] p-6">
            <h3 className="text-xl font-semibold sm:text-2xl">Nothing Found</h3>
            <p className="mt-2 text-sm text-white/70 sm:text-base">
              No results matched your current search. Please try a different keyword.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchResultsSection
