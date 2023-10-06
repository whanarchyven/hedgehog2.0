import React from 'react';

const Comment = ({comment}) => {
    return (
        <p className={'w-full mt-3 font-normal'}>
            <span className={'font-bold mr-2'}>{comment?.nickname}</span>
            {comment?.content}
        </p>
    );
};

export default Comment;