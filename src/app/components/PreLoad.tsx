/* eslint-disable @next/next/no-img-element */
const PreLoad = ({ sources }: { sources: { src: string; type: 'img' }[] }) => {
  return (
    <>
      {sources.map((a, i) => (
        <link key={i} href={a.src} rel="prefetch" as="img" />
      ))}
    </>
  );
};
export default PreLoad;
