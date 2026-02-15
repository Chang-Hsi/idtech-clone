const CollectionIntroSection = ({ collection }) => {
  const introPdfUrl =
    collection.introPdfUrl ??
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

  return (
    <section className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div className="overflow-hidden rounded-sm">
          {collection.media?.heroImageUrl ? (
            <img
              src={collection.media.heroImageUrl}
              alt={collection.name}
              className="aspect-[4/3] h-[24rem] object-cover"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#d9dee3] text-sm text-black/55">
              Intro Image
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-2xl font-semibold tracking-[0.12em] text-[#00B388]">INTRO</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{collection.name}</h2>
          <p className="mt-4 text-sm text-black/75 sm:text-base">{collection.intro}</p>

          <a
            href={introPdfUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit rounded-sm bg-[#00B388] px-5 py-3 text-sm font-medium text-black hover:bg-[#16c79a]"
          >
            Open PDF
          </a>
        </div>
      </div>
    </section>
  )
}

export default CollectionIntroSection
