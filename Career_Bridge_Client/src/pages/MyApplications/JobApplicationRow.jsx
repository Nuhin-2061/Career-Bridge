

const JobApplicationRow = ({ application, index }) => {
    const { title, company, company_logo, category, status, applicationDeadline } = application;
    return (
        <tr>
            <td className="pl-4 w-8">
                {index + 1}
            </td>
            <td className="px-4 py-3 text-sm font-medium">
                <div className="flex items-center cursor-pointer w-max">
                    <img src={company_logo} alt="team-1" className="w-9 h-9 rounded-full shrink-0" />
                    <div className="ml-2">
                        <p>{company}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm  font-medium">
                <a href="mailto:timj1456@gmail.com" className="underline">
                    {category}
                </a>
            </td>
            <td className="px-4 py-3 text-sm  font-medium">
                {title}
            </td>
            <td className="px-4 py-3 text-sm  font-medium">
                <span className="inline-flex items-center border border-gray-200 gap-2 px-2 py-1 rounded-lg">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    {status.slice(0, 1).toUpperCase() + status.slice(1, status.len)}
                </span>
            </td>
            <td className="px-4 py-3 text-sm  font-medium">
                {applicationDeadline}
            </td>
            <td className="flex gap-3 px-4 py-3 text-sm font-medium">
                <button type="button" className="flex items-center gap-2 rounded-lg text-blue-600 bg-blue-50 border border-gray-200 px-3 py-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current inline" viewBox="0 0 64 64">
                        <path d="M11.105 43.597a2 2 0 0 1-1.414-3.414L40.945 8.929a2 2 0 1 1 2.828 2.828L12.519 43.011c-.39.39-.902.586-1.414.586z" data-original="#000000" />
                        <path d="M8.017 58a2 2 0 0 1-1.957-2.42l3.09-14.403a2 2 0 1 1 3.911.839l-3.09 14.403A2 2 0 0 1 8.017 58zm14.401-3.09a2 2 0 0 1-1.414-3.414l31.254-31.253a2 2 0 1 1 2.828 2.828L23.833 54.324a1.994 1.994 0 0 1-1.415.586z" data-original="#000000" />
                        <path d="M8.013 58a2.001 2.001 0 0 1-.418-3.956l14.403-3.09a2 2 0 0 1 .839 3.911l-14.403 3.09a1.958 1.958 0 0 1-.421.045zm40.002-28.687a1.99 1.99 0 0 1-1.414-.586L35.288 17.414a2 2 0 1 1 2.828-2.828l11.313 11.313a2 2 0 0 1-1.414 3.414zm5.657-5.656a2 2 0 0 1-1.415-3.415c1.113-1.113 1.726-2.62 1.726-4.242s-.613-3.129-1.726-4.242c-1.114-1.114-2.621-1.727-4.243-1.727s-3.129.613-4.242 1.727a2 2 0 1 1-2.829-2.829c1.868-1.869 4.379-2.898 7.071-2.898 2.691 0 5.203 1.029 7.071 2.898 1.869 1.868 2.898 4.379 2.898 7.071s-1.029 5.203-2.898 7.071a1.99 1.99 0 0 1-1.413.586z" data-original="#000000" />
                    </svg>
                    Edit
                </button>
                <button type="button" className="flex items-center gap-2 rounded-lg text-red-600 bg-red-50 border border-gray-200 px-3 py-1 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-current inline" viewBox="0 0 512 512">
                        <path d="M424 64h-88V48c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16H88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283C87.788 491.919 108.848 512 134.512 512h242.976c25.665 0 46.725-20.081 47.945-45.717L439.256 176H448c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zM208 48c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zM80 104c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40H80zm313.469 360.761A15.98 15.98 0 0 1 377.488 480H134.512a15.98 15.98 0 0 1-15.981-15.239L104.78 176h302.44z" data-original="#000000" />
                        <path d="M256 448c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16zm80 0c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16zm-160 0c8.836 0 16-7.164 16-16V224c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" data-original="#000000" />
                    </svg>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default JobApplicationRow;