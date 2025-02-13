import { useState, useEffect } from 'react';
import { reviewerService } from '../../../api/services/reviewerService';
import type { Reviewer } from '../../../api/types';

const PopularReviewersPage = () => {
    const [topReviewers, setTopReviewers] = useState<Reviewer[]>([]);
    const [otherReviewers, setOtherReviewers] = useState<Reviewer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchReviewers() {
            try {
                const response = await reviewerService.getTopReviewers();
                setTopReviewers(response.data.top);
                setOtherReviewers(response.data.others);
            } catch (err) {
                console.error('API 호출 오류:', err);
                setError('리뷰어 정보를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        }
        fetchReviewers();
    }, []);

    if (loading)
        return <div className="text-center p-4">🔄 불러오는 중...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="flex-1 mx-4 p-6 bg-white rounded-lg shadow-md mt-4">
            {/* 헤더 섹션 */}
            <h1 className="text-2xl font-bold mb-8 text-center">
                이달의 베스트 리뷰어를 만나보세요!
            </h1>

            {/* 상위 리뷰어 섹션 */}
            <div className="flex justify-center items-end mb-10 gap-4">
                {topReviewers.map((reviewer, index) => (
                    <div
                        key={reviewer.id}
                        className={`relative flex flex-col items-center justify-end shadow-lg border border-gray-300 rounded-lg overflow-hidden
                        ${
                            index === 0
                                ? 'w-40 h-40 text-xl animate-pulse border-yellow-400 shadow-2xl'
                                : 'w-32 h-32 text-base'
                        }
                        ${index === 0 ? 'bg-yellow-100' : 'bg-white'}
                        `}
                    >
                        {/* 왕관 아이콘 (1등만 크게) */}
                        <div className="absolute -top-6 flex justify-center w-full">
                            <span
                                className={`text-4xl font-bold ${
                                    index === 0
                                        ? 'text-yellow-500 animate-bounce'
                                        : 'text-gray-400'
                                }`}
                            >
                                👑
                            </span>
                        </div>

                        {/* 프로필 이미지 */}
                        <div className="w-full h-20 flex items-center justify-center">
                            <img
                                src={
                                    reviewer.image ||
                                    `https://randomuser.me/api/portraits/men/${reviewer.id}.jpg`
                                }
                                alt={reviewer.name}
                                className={`object-cover rounded-full ${
                                    index === 0
                                        ? 'w-28 h-28 border-4 border-yellow-500'
                                        : 'w-20 h-20'
                                }`}
                            />
                        </div>

                        {/* 리뷰어 정보 */}
                        <div className="bg-white w-full h-16 flex flex-col items-center justify-center">
                            <span className="font-semibold">
                                {reviewer.name}
                            </span>
                            <span className="text-gray-500">
                                리뷰 수: {reviewer.reviewCount}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 나머지 리뷰어 목록 */}
            <div className="space-y-2">
                {otherReviewers.map((reviewer) => (
                    <div
                        key={reviewer.id}
                        className="flex items-center p-2 border-b border-gray-200"
                    >
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-2 flex items-center justify-center">
                            <img
                                src={
                                    reviewer.image ||
                                    `https://randomuser.me/api/portraits/women/${reviewer.id}.jpg`
                                }
                                alt={reviewer.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <span className="flex-1">{reviewer.name}</span>
                        <span>{reviewer.reviewCount} 개</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularReviewersPage;
