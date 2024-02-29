<div class="topic-main-buttons pull-right inline-block">
    <span class="loading-indicator btn pull-left hidden" done="0">
        <span class="hidden-xs">[[topic:loading_more_posts]]</span> <i class="fa fa-refresh fa-spin"></i>
    </span>

    {{{ if isQandA }}}
    {{{ if answered }}}
        <i class="fa fa-fw fa-thumbs-up"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline">Answered</span>
    {{{ end }}}
    {{{ end }}}

    {{{ if loggedIn }}}
    {{{ if isQandA }}}
    {{{ if isInstructor }}}
    {{{ if !answered }}}
        <button component="topic/mark-answered-for-all" class="btn btn-sm btn-default">
            <i class="fa fa-fw fa-thumbs-up text-primary"></i>
            <span class="d-none d-md-inline fw-semibold">Mark Answered for all</span>
        </button>
    {{{ end }}}
    {{{ end }}}
    {{{ end }}}
    {{{ end }}}


    <!-- IF loggedIn -->
    <button component="topic/mark-unread" class="btn btn-sm btn-default" title="[[topic:mark_unread]]">
        <i class="fa fa-fw fa-inbox"></i><span class="visible-sm-inline visible-md-inline visible-lg-inline"></span>
    </button>
    <!-- ENDIF loggedIn -->

    <!-- IMPORT partials/topic/watch.tpl -->

    <!-- IMPORT partials/topic/sort.tpl -->

    <div class="inline-block">
    <!-- IMPORT partials/thread_tools.tpl -->
    </div>
    <!-- IMPORT partials/topic/reply-button.tpl -->
</div>
