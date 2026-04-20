import React from 'react'
import Editor from './editor';
import NavScript from '@/app/components/workspace/script/NavScript';

interface ScriptPageProps {
  params: Promise<{ script: string }>
}

const page = async ({ params }: ScriptPageProps) => {
  const awaitedParams = await params;
  const documentId = awaitedParams.script;
  console.log("Document ID:", documentId);

  return (
    <div className='flex flex-col relative w-full overflow-y-scroll'>
        <Editor />
    </div>
  )
}

export default page