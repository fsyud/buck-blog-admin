import React, { FC, useRef, useState, useEffect } from 'react'
import { connect, Dispatch } from 'umi';

interface createArticleProps {
  dispatch: Dispatch;
}

export const createArticle: FC<createArticleProps> = (props) => {

  return (
    <div>创作</div>
  )
}

export default createArticle;
