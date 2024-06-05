export const table = (nums: number[]) => {
    return (
        <svg width="225" height="490" viewBox="0 0 225 490" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="23.6154" height="43" rx="5.5" transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 7.3846)" fill={nums.includes(0) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(-4.37114e-08 1 1 4.37114e-08 97.1001 2.18557e-08)" fill={nums.includes(0) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)" fill={nums.includes(1) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 119.4)" fill={nums.includes(1) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 219.333)" fill={nums.includes(2) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 212.733)" fill={nums.includes(2) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 312.667)" fill={nums.includes(3) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 306.067)" fill={nums.includes(3) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 406)" fill={nums.includes(4) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 399.4)" fill={nums.includes(4) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect id="food-table" x="39" y="40" width="147" height="410" rx="16" fill="#D9D9D9"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 83)" fill={nums.includes(5) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 89.6)" fill={nums.includes(5) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 176.333)" fill={nums.includes(6) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 182.933)" fill={nums.includes(6) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 269.667)" fill={nums.includes(7) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 276.267)" fill={nums.includes(7) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 363)" fill={nums.includes(8) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 369.6)" fill={nums.includes(8) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="-0.5" width="23.6154" height="43" rx="5.5" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 133.5 481.615)" fill={nums.includes(9) ? "#0038AA" : "#949494"} stroke="white"/>
            <rect x="-0.5" y="-0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 126.9 489)" fill={nums.includes(9) ? "#0038AA" : "#949494"} stroke="white"/>
        </svg>
    )
}

export const tableDark = (nums: number[]) => {
    return (
        <svg width="225" height="490" viewBox="0 0 225 490" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="23.6154" height="43" rx="5.5" transform="matrix(-4.37114e-08 1 1 4.37114e-08 90.5 7.3846)" fill={nums.includes(0) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(-4.37114e-08 1 1 4.37114e-08 97.1001 2.18557e-08)" fill={nums.includes(0) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 126)" fill={nums.includes(1) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 119.4)" fill={nums.includes(1) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 219.333)" fill={nums.includes(2) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 212.733)" fill={nums.includes(2) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 312.667)" fill={nums.includes(3) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 306.067)" fill={nums.includes(3) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="22.8462" height="43" rx="5.5" transform="matrix(1 1.74846e-07 1.74846e-07 -1 7.15381 406)" fill={nums.includes(4) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="0.5" y="-0.5" width="13.3077" height="29.8" rx="6.65384" transform="matrix(1 1.74846e-07 1.74846e-07 -1 8.74228e-08 399.4)" fill={nums.includes(4) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="39" y="40" width="147" height="410" rx="16" fill="#1F242F"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 83)" fill={nums.includes(5) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 89.6)" fill={nums.includes(5) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 176.333)" fill={nums.includes(6) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 182.933)" fill={nums.includes(6) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 269.667)" fill={nums.includes(7) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 276.267)" fill={nums.includes(7) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="22.8462" height="43" rx="5.5" transform="matrix(-1 0 0 1 216.846 363)" fill={nums.includes(8) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="0.5" width="13.3077" height="29.8" rx="6.65385" transform="matrix(-1 0 0 1 224 369.6)" fill={nums.includes(8) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="-0.5" width="23.6154" height="43" rx="5.5" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 133.5 481.615)" fill={nums.includes(9) ? "#0038AA" : "#353535"} stroke="white"/>
            <rect x="-0.5" y="-0.5" width="13.7692" height="29.8" rx="6.88461" transform="matrix(1.19249e-08 -1 -1 -1.19249e-08 126.9 489)" fill={nums.includes(9) ? "#0038AA" : "#353535"} stroke="white"/>
        </svg>
    )
}