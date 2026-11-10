"use server";
import Editor from './editor';

interface ScriptPageProps {
  params: Promise<{ script: string }>
}



const page = async ({ params }: ScriptPageProps) => {

  const awaitedParams = await params;
  const documentId = awaitedParams.script;

  const res = await fetch(`http://localhost:3000/api/script/${documentId}`).then((res) => res.json());

  // console.log("Draft data:", res);

  return (
    <div className='flex flex-col relative w-full overflow-y-scroll'>
        <Editor draft={res} />
    </div>
  )
}

export default page