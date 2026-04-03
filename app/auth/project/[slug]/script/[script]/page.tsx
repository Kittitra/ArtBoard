import React from 'react'
import Editor from './editor';

interface ScriptPageProps {
  params: Promise<{ script: string }>
}

const page = async ({ params }: ScriptPageProps) => {
  const awaitedParams = await params;
  const documentId = awaitedParams.script;
  console.log("Document ID:", documentId);

  return (
    <div className='bg-custom w-full h-screen p-10'>
      <div className='text-white text-2xl'>page: {documentId}</div>
      <Editor />
    </div>
  )
}

export default page