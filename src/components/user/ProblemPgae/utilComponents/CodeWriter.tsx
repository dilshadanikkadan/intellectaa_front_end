"use client";
import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";
import {
  codeExcuteHelper,
  codeFetchHelper,
  createSubmissionHelper,
} from "@/helpers/course/courseApiHelper";
import LanguageCode from "./LanguageSelector";
import SubmissionModal from "./SubmissionModal";
import { useUserStore } from "@/store/storeProviders/UseUserStore";
import { useParams } from "next/navigation";

const CodeWriter = ({
  solution,
  setSumbmission,
  setsubMissionErr,
  setSelectedLanguage,
  selectedLanguage,
  submissonResult
}: any) => {
  const [code, setCode] = useState("");
  const solutionValue = solution?.solutionTemplate;
const user= useUserStore(state=> state.user);
const [isOpen, setIsOpen] = useState<boolean>(false);

const {id:problemName} = useParams()
  useEffect(() => {
    if (solution?.solutionTemplate) {
      setCode(solution.solutionTemplate);
    }
  }, [solution]);


   const {mutate:submissionMutate,isPending:pending}= useMutation({
    mutationFn:createSubmissionHelper,
    onSuccess:(data)=>{
console.log(">>>>>>>>>>>>>>>>>",data?.payload);

    }
   })
  const { mutate: runCodeMutate, isPending } = useMutation({
    mutationFn: codeExcuteHelper,
    onSuccess: (data) => {
      setsubMissionErr("");
      setSumbmission(data?.payload);

      console.log("data", data?.payload);
    },
    onError: (err) => {
      setsubMissionErr(err);
    },
  }); 

  const runCode = () => {
      
      runCodeMutate({ code, language: selectedLanguage,question:problemName, problemType:'string'});
  };

  const onChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleSubmission=()=>{


    console.log({
      userId:user?._id,
      problemName,
      problem:code
    });
    submissionMutate({
      userId:user?._id,
      problemName,
      problem:code
    })

    setIsOpen(true)
  }
  return (
    <div className="w-full  ">
      <div className="w-full h-9 flex justify-between ">
        {isPending ? (
          <button className="bg-[#F0F0F0] rounded-md py-1 text-sm px-4">
            <TbFidgetSpinner className="animate-spin" />{" "}
          </button>
        ) : ( 
          <button
            onClick={runCode}
            className="bg-[#F0F0F0] rounded-md py-1 text-sm px-3"
          >
            <PlayArrowIcon /> Run
          </button>
        )}
        <button disabled={!submissonResult} onClick={handleSubmission} className="bg-[#F0F0F0] rounded-md py-1 text-sm px-3 text-[#20B486]">
          <CloudUploadIcon /> submit
        </button>
      </div>
      <LanguageCode setSelectedLanguage={setSelectedLanguage} />
      <div className="h-[300px] border border-gray-300 rounded-lg ">
        <AceEditor
          mode="javascript"
          theme="tomorrow"
          onChange={onChange}
          value={code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          fontSize={14}
          width="100%"
          height="90%"
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          className="rounded-lg"
        />
      </div>
      <SubmissionModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default CodeWriter;
