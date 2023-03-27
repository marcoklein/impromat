import SSRTest from './SSRTest';

export default function Page() {
  return (
    <>
      {/* @ts-expect-error Async Server Component  */}
      <SSRTest />
      <h1>This WILL ALWAYS RENDER</h1>
    </>
  );
}
