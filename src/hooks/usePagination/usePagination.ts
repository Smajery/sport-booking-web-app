'use client'

import React from 'react'

type TPagination = {
	currentPage: number
	totalItems: number
	totalPages: number
	from: number
	to: number
}
export const usePagination = () => {
	const [pagination, setPagination] = React.useState<TPagination>({
		currentPage: 1,
		totalItems: 0,
		totalPages: 0,
		from: 0,
		to: 0
	})

	const handleSetCurrentPage = (newCurrentPage: number) => {
		setPagination({ ...pagination, currentPage: newCurrentPage })
	}

	const handlePageChange = (e: any) => {
		setPagination({ ...pagination, currentPage: e.selected + 1 })
	}

	return { pagination, setPagination, handleSetCurrentPage, handlePageChange }
}
